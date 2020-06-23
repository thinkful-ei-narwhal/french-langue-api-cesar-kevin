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
      .join('word as headWord', 'language.head','headWord.id')
      .select(
        'headWord.original as nextWord',
        'headWord.correct_count as wordCorrectCount',
        'headWord.incorrect_count as wordIncorrectCount',
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
}

module.exports = LanguageService
