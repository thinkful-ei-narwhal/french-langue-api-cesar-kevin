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

  updateWordTable(db, sll) {
    let currNode = sll.head;
  
    if (!sll.head) {
      return console.log('Linked list is empty');
    }
    while (currNode !== null) {
    let {/*things from node to update*//*id*/} = currNode
      let updatedWord = {/*things from node to update*/}
      this.updateWord(db, id, updatedWord)
      currNode = currNode.next;
    }
  },

  updateWord(db, id, newWordFields) {
   return db('word')
    .where({ id })
    .update(newWordFields)
  },

  createList(language, words){
    const link = new LinkedList()
    link.id=language.id;
    link.name=language.name;
    link.total_score=language.total_score;


    let head = words.find(word => word.id === language.head)

    link.insertFirst({
      id: head.id,
      original: head.original, 
      translation: head.translation,
      memory_value: head.memory_value,
      correct_count: head.correct_count,
      incorrect_count: head.incorrect_count,
      language_id: head.language_id,
      next: head.next,
    })
    while(head.next !== null){
      let nextWord = words.find(word => word.id === language.head)
      link.insertLast({
        id: nextWord.id,
        original: nextWord.original, 
        translation: nextWord.translation,
        memory_value: nextWord.memory_value,
        correct_count: nextWord.correct_count,
        incorrect_count: nextWord.incorrect_count,
        language_id: nextWord.language_id,
        next: nextWord.next,
      })
    }
    return link;
  }
}

module.exports = LanguageService
