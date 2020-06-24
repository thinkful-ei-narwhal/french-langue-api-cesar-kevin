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

    
    let current = words.find(word => word.id === language.head)

    link.insertFirst({
      id: current.id,
      original: current.original, 
      translation: current.translation,
      memory_value: current.memory_value,
      correct_count: current.correct_count,
      incorrect_count: current.incorrect_count,
    })
    while(current.next){
      current = words.find(word => word.id === current.next)
      link.insertLast({
        id: current.id,
        original: current.original, 
        translation: current.translation,
        memory_value: current.memory_value,
        correct_count: current.correct_count,
        incorrect_count: current.incorrect_count,
      })
    }
    console.log(link);
    return link;
  },

  moveHead(language, word, link){
    link.remove(word)
    link.insertAt(word, word.memory_value+1)
    console.log(link);
    console.log('ran');
  }
}

module.exports = LanguageService
