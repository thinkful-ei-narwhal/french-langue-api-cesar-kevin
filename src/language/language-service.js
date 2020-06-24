const LinkedList = require('../LinkedList/LinkedList')

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },
  getHead(db, user_id) {
    return db
      .from('language')
      .join('word', 'language.head','word.id')
      .select(
        'word.original as nextWord',
        'word.correct_count as wordCorrectCount',
        'word.incorrect_count as wordIncorrectCount',
        'language.total_score as totalScore'
      )
      .where('language.user_id', user_id)
  },

  updateWordTable(db, sll, language_id) {
    let currNode = sll.head;
    let totalScore = sll.total_score;

    this.updateTotalScore(db, currNode.value.id, totalScore, language_id)
  
    if (!sll.head) {
      return console.log('Linked list is empty');
    }
    while (currNode !== null) {
    let {id, memory_value, correct_count, incorrect_count} = currNode.value
      let updatedWord = {
        memory_value: memory_value,
        correct_count: correct_count,
        incorrect_count: incorrect_count,
        next: currNode.next ? currNode.next.value.id : null 
      }
      this.updateWord(db, id, updatedWord)
      currNode = currNode.next;
    }
  },

  updateWord(db, id, newWordFields) {
   return db('word')
    .where({ id })
    .update(newWordFields)
    .catch(err => console.log(err))
  },

  updateTotalScore(db, head, totalScore, id) {
    return db('language')
      .where({ id })
      .update({
        head:head,
        total_score: totalScore
      })
      .catch(err => console.log(err))
  },

  createList(language, words){
    const link = new LinkedList()
    link.id=language.id;
    link.name=language.name;
    link.total_score=language.total_score;

    
    let current = words.find(word => word.id === language.head)

    while(current){
      link.insertLast({
        id: current.id,
        original: current.original, 
        translation: current.translation,
        memory_value: current.memory_value,
        correct_count: current.correct_count,
        incorrect_count: current.incorrect_count,
      })
      current = words.find(word => word.id === current.next)
    }
    return link;
  },

  moveHead(word, link){
    link.remove(word)
    link.insertAt(word, word.memory_value+1)
    return link;
  }
}

module.exports = LanguageService
