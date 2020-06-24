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
  // getWord(db, nextWord) {
  //   return db
  //     .from('word')
  //     .select(
  //       'original'
  //     )
  //     .where('id', nextWord)
  // }

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
}

module.exports = LanguageService
