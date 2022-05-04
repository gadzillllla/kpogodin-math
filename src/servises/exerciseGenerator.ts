export enum OperatorsEnum {
  plus = '+',
  minus = '-',
}

export interface IGeneratedExercise {
  a: number;
  b: number;
  operator: OperatorsEnum;
  answer: number;
}

export default class ExerciseGenerator {
  operators: OperatorsEnum[];

  limit: number;

  constructor(operators: OperatorsEnum[], limit: number) {
    this.operators = operators;
    this.limit = limit;
  }

  generateRandomNumberWithLimit(optionalLimit: number = 0): number {
    return Math.ceil(Math.random() * (this.limit - optionalLimit));
  }

  getRandomOperator(): OperatorsEnum {
    const operatorsCount = this.operators.length;

    const randomIndex = Math.ceil(Math.random() * operatorsCount) - 1;
    return this.operators[randomIndex];
  }

  generatePlusExercise(): IGeneratedExercise {
    const a = this.generateRandomNumberWithLimit();
    const b = this.generateRandomNumberWithLimit(this.limit - 3);
    const answer = a + b;
    return {
      a,
      b,
      operator: OperatorsEnum.plus,
      answer,
    };
  }

  generateMinusExercise(): IGeneratedExercise {
    let a = this.generateRandomNumberWithLimit();
    const b = this.generateRandomNumberWithLimit();

    if (a === b) {
      a = a + 1;
    }

    const largestNumber = Math.max(a, b);
    const lowestNumber = Math.min(a, b);
    const answer = largestNumber - lowestNumber;

    return {
      a: largestNumber,
      b: lowestNumber,
      operator: OperatorsEnum.minus,
      answer,
    };
  }

  generateExercise(): IGeneratedExercise {
    const operator = this.getRandomOperator();

    if (operator === OperatorsEnum.plus) {
      return this.generatePlusExercise();
    } else {
      return this.generateMinusExercise();
    }
  }
}
