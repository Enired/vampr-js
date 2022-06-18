class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;

  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      count++;
    }
    return count;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const thisVampireDistance = this.numberOfVampiresFromOriginal;
    const otherVampireDistance = vampire.numberOfVampiresFromOriginal;

    if (thisVampireDistance < otherVampireDistance) {
      return true;
    } else {
      return false;
    }


  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let youngestVampire;
    let olderVampire;

    if (!this.creator || !vampire.creator) { //Comparing anything with root.
      if (!this.creator) {
        return this;
      } else {
        return vampire;
      }
    }

    if (this.name === vampire.name) { //Comparing self
      return this;
    }

    if (this.isMoreSeniorThan(vampire)) { //Determining who is the younger vampire between the two
      youngestVampire = vampire;
      olderVampire = this;
    } else {
      youngestVampire = this;
      olderVampire = vampire;
    }

    while (youngestVampire.creator) {
      if (youngestVampire.creator.name === olderVampire.name) { //Descendant
        return olderVampire;
      } else if (youngestVampire.creator.name === olderVampire.creator.name) { //Share the same creator
        return olderVampire.creator;
      } else {
        youngestVampire = youngestVampire.creator;
      }
    }

    return youngestVampire; //Root Case


















  }
}

module.exports = Vampire;

