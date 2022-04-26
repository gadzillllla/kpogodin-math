export enum OperatorsEnum {
  plus = '+',
  minus = '-',
}

export type IGeneratedCalculation = [number, OperatorsEnum, number];
export interface IGeneratedExercise {
  task: IGeneratedCalculation;
  answer: number;
}

export default class ExerciseGenerator {
  operator: OperatorsEnum;

  limit: number;

  constructor(operator: OperatorsEnum, limit: number) {
    this.operator = operator;
    this.limit = limit;
  }

  generateRandomNumberWithLimit(optionalLimit: number = 0): number {
    return Math.ceil(Math.random() * (this.limit - optionalLimit));
  }

  generateExercise(): IGeneratedExercise {
    const a = this.generateRandomNumberWithLimit();
    const b = this.generateRandomNumberWithLimit(this.limit - 3);
    const result = this.operator === OperatorsEnum.plus ? a + b : a - b;
    return {
      task: [a, this.operator, b],
      answer: result,
    };
  }
}
