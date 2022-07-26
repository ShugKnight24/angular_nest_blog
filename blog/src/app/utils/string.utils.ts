export default class StringUtils {

  static stringContainsNumber(
    string: string
  ) : boolean {
    const numberRegex = /[0-9]/;

    return numberRegex.test(string);
  }

  static stringContainsSpecialCharacter(
    string: string
  ) : boolean {
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    return specialCharacterRegex.test(string);
  }

  static stringContainsUppercase(
    string: string
  ) : boolean {
    const uppercaseRegex = /[A-Z]/;

    return uppercaseRegex.test(string);
  }

}
