const mongoose = require('mongoose');
const Mixed = require("mongoose").Schema.Types.Mixed;

const CharacterStaticSchema = new mongoose.Schema({
  race: {
    type: Mixed
  },
  class: {
    type: Mixed
  },
  theme: {
    type: Mixed
  }
}, {
  collection: 'statics'
});

CharacterStaticSchema.set('toObject', {
  getters: true
});
CharacterStaticSchema.set('toJSON', {
  getters: true
});

CharacterStaticSchema.statics.findOneAndUpdate = undefined;
CharacterStaticSchema.statics.update = undefined;
CharacterStaticSchema.statics.create = undefined;
CharacterStaticSchema.statics.insertMany = undefined;
CharacterStaticSchema.statics.deleteMany = undefined;

CharacterStaticSchema.statics.fetchAllRaces = async function () {
  const races = await this.find({}, {
    'race': 1
  }).lean().sort({
    'race.name': 1
  });

  if (races) {
    return races;
  } else {
    throw Error('Static info on Races could not be pulled');
  }
}
CharacterStaticSchema.statics.fetchAllClasses = async function () {
  const classes = await this.find({}, {
    'class': 1
  }).lean();

  if (classes) {
    return classes;
  } else {
    throw Error('Static info on Classes could not be pulled');
  }
}
CharacterStaticSchema.statics.fetchAllThemes = async function () {
  const themes = await this.find({}, {
    'theme': 1
  }).lean();

  if (themes) {
    return themes;
  } else {
    throw Error('Static info on Themes could not be pulled');
  }
}
CharacterStaticSchema.statics.fetchAllSkills = async function () {
  const themes = await this.find({}, {
    'skills': 1
  }).lean();

  if (themes) {
    return themes;
  } else {
    throw Error('Static info on Themes could not be pulled');
  }
}
CharacterStaticSchema.statics.fetchRace = async function (raceName) {
  const raceData = await this.find({}, {
    [`race.${raceName}`]: 1
  }).lean();

  if (raceData) {
    return raceData;
  } else {
    throw Error(`Static info on Race ${raceName} could not be pulled`);
  }
}
CharacterStaticSchema.statics.fetchClass = async function (className) {
  const classData = await this.find({}, {
    [`class.${className}`]: 1
  }).lean();

  if (classData) {
    return classData;
  } else {
    throw Error(`Static info on Class ${className} could not be pulled`);
  }
}
CharacterStaticSchema.statics.fetchTheme = async function (themeName) {
  const themeData = await this.find({}, {
    [`theme.${themeName}`]: 1
  }).lean();

  if (themeData) {
    return themeData;
  } else {
    throw Error(`Static info on Theme ${themeName} could not be pulled`);
  }
}

const CharacterStatic = mongoose.model('CharacterStatic', CharacterStaticSchema);

module.exports = CharacterStatic;