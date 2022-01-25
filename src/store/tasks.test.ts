import {addSalary, ActionType, divSalary, fallSalary, mulSalary, salaryReducer} from "./tasks";


test('addSalary', () => {
    //1. Test data
    const salary = 700
    const bonus = 250
    //
    const result = addSalary(salary, bonus)
    //3.Проверка
    expect(result).toBe(950)
})

test('fallSalary', () => {
    const salary: number = 950
    const minus: number = 50
    const result = fallSalary(salary, minus)
    expect(result).toBe(900)
})

test('mulSalary', () => {
    const salary: number = 700
    const coefficient: number = 1.2
    const result = mulSalary(salary, coefficient)
    expect(result).toBe(840)
})
test('divSalary', () => {
    const salary: number = 700
    const coefficient: number = 0.9
    const result = divSalary(salary, coefficient)
    expect(result).toBe(630)
})

//______________________________________________________________________________

test('case ADD_SALARY', () => {
    const salary: number = 700
    const action: ActionType = {type: "ADD_SALARY", bonus: 300}
    expect(salaryReducer(salary,action)).toBe(1000)
})

test('case FALL_SALARY', () => {
    const salary: number = 700
    const action: ActionType = {type: "FALL_SALARY", minus: 50}
    expect(salaryReducer(salary,action)).toBe(650)
})

test('case MUL_SALARY', () => {
    const salary: number = 700
    const action: ActionType = {type: "MUL_SALARY", coefficient: 1.2}
    expect(salaryReducer(salary,action)).toBe(840)
})

test('case DIV_SALARY', () => {
    const salary: number = 700
    const action: ActionType = {type: "DIV_SALARY", coefficient: 0.9}
    expect(salaryReducer(salary,action)).toBe(630)
})