export const addSalary = (salary: number, bonus: number) => salary + bonus
export const fallSalary = (salary: number, minus: number) => salary - minus
export const mulSalary = (salary: number, coefficient: number) => salary * coefficient
export const divSalary = (salary: number, coefficient: number) => salary * coefficient

//1. salary = state
//2. type of action / action type
//3. Доп. значения

export type AddSalaryActionType = {
    type: 'ADD_SALARY'
    bonus: number
}

export type fallSalaryActionType = {
    type: 'FALL_SALARY'
    minus: number
}

export type mulSalaryActionType = {
    type: 'MUL_SALARY'
    coefficient: number
}

export type divSalaryActionType = {
    type: 'DIV_SALARY'
    coefficient: number
}

export type ActionType = AddSalaryActionType |
    fallSalaryActionType | mulSalaryActionType |
    divSalaryActionType

export const salaryReducer = (salary: number, action: ActionType) => {
    switch (action.type) {
        case 'ADD_SALARY':
            return salary + action.bonus
        case 'FALL_SALARY':
            return salary - action.minus
        case 'MUL_SALARY':
        case 'DIV_SALARY':
            return salary * action.coefficient
        default:
            return salary
    }
}