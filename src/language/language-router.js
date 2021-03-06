const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const LinkedList = require('../LinkedList/LinkedList')
const { contentSecurityPolicy } = require('helmet')

const languageRouter = express.Router()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    let head;
    LanguageService.getHead(req.app.get('db'),req.user.id)
    .then(word=>{
      res.status(200).json(word[0])
    })
    .catch(next);
  })

languageRouter
  .post('/guess', async (req, res, next) => {
    if (!req.body.guess) {
      return res.status(400).json({
        error: `Missing 'guess' in request body`
      })
    }
    const words = await LanguageService.getLanguageWords(req.app.get('db'),req.language.id,);
    const link = LanguageService.createList(req.language,words);
    const current= link.head;
    let isCorrect = '';
    if(req.body.guess== current.value.translation){
      //do something to link double "memory values"
      current.value.memory_value *=2
      current.value.correct_count+=1
      link.total_score +=1
      isCorrect = true
    }else{
      //do something to reset to 1 "memory values"
      current.value.memory_value=1
      current.value.incorrect_count+=1
      isCorrect = false
    }
    //move head accordingly on link list
    const NewLink = LanguageService.moveHead(current.value,link);
    LanguageService.updateWordTable(req.app.get('db'), NewLink, req.language.id)

    res.json({
      nextWord: NewLink.head.value.original,
      totalScore: NewLink.total_score,
      wordCorrectCount: NewLink.head.value.correct_count,
      wordIncorrectCount: NewLink.head.value.incorrect_count,
      answer: current.value.translation,
      isCorrect: isCorrect
    })
  })

module.exports = languageRouter
