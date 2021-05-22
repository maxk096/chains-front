import { habitType } from '../utils'

export const getPredefinedHabits = () => {
    const planNextDay = {
        id: 'planNextDay',
        name: 'Plan the next day',
        type: habitType.BUILD,
        icon: 'Category',
        question: 'Have I planned the next day?',
        reason: 'I want to be organized.',
        executionDays: [1, 2, 3, 4, 5, 6, 7]
    }
    const reading = {
        id: 'Reading',
        name: 'Reading',
        type: habitType.BUILD,
        icon: 'Book',
        question: 'Have I read 20 pages?',
        reason: 'I want to expand my vocabulary.',
        executionDays: [1, 2, 3, 4, 5, 6, 7]
    }
    const exercise = {
        id: 'Exercise',
        name: 'Exercise',
        type: habitType.BUILD,
        icon: 'FitnessCenter',
        question: 'Have I exercised for 30 minutes?',
        reason: 'I want to get in shape.',
        executionDays: [2, 4, 6, 7]
    }
    const codeOnLeetCode = {
        id: 'codeOnLeetCode',
        name: 'Learn data structures on LeetCode',
        type: habitType.BUILD,
        icon: 'Code',
        question: 'Have I solved one problem on LeetCode?',
        reason: 'I want to learn data structures.',
        executionDays: [2, 3, 4, 6, 7]
    }
    const playingVideoGames = {
        id: 'playingVideoGames',
        name: 'Playing video games',
        type: habitType.BREAK,
        icon: 'DesktopAccessDisabled',
        question: 'Have I played video games?',
        reason: 'I want to get in control of my time.',
        executionDays: [1, 2, 3, 4, 5, 7]
    }
    return [planNextDay, reading, exercise, codeOnLeetCode, playingVideoGames]
}
