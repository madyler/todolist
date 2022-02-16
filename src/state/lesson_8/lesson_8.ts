// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    const n = [...nums]
    return n.reduce((s, m) => s + m)
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
    let T = '11'
    if (b === c || a === c || b === a) T = '01'
    if (a === b && b === c) T = '10'
    if (a + b < c || b + c < a || a + c < b) T = '00'
    return T
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    return number.toString().split('').reduce((s, m) => s + Number(m), 0)
}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let odd = 0
    for (let i = 0; i < arr.length; i++) {
        if(i%2===0){
            odd += arr[i]
        }else{
            odd -= arr[i]
        }
    }
    return odd > 0
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    let a = []
    for (let i = 0; i < array.length; i++) {
        if (array[i]>0 && array[i]%1===0)a.push(array[i]**2)
    }
    return a
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    let s = 0
    for (let i = 0; i <= N; i++) {
        s += i
    }
    return s
}


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(Money: number): Array<number> {
    let res: Array<number> = []
    const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    for (let i = 0; i < banknotes.length; i++) {
        while(Money-banknotes[i]>=0){
            res.push(banknotes[i])
            Money -= banknotes[i]
        }
    }
    return res
}