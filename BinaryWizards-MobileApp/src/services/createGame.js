import { REACT_NATIVE_API_URL, REACT_NATIVE_API_PORT } from "@env";
import Toast from "react-native-toast-message";
import axiosInstance from "../utils/axiosInstance";

export const fetchCategories = async () => {
    try {
        const response = await axiosInstance.get('/categories/');
        const data = response.data;

        const formattedCategories = data.map((category) => ({
            key: category.id,
            label: category.name,
            value: category.name,
        }));

        return formattedCategories;
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'An error occured while fetching the categories',
        });
        console.error("Error fetching categories", error);
    }
};

export const fetchDifficulties = async () => {
    try {
        const response = await axiosInstance.get("/difficulties");
        const data = response.data;

        const formattedDifficulties = data.map((difficulty) => ({
            label: difficulty,
            value: String(difficulty).charAt(0).toUpperCase() + String(difficulty).slice(1),
        }));

        return formattedDifficulties;
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'An error occured while fetching the difficulties',
        });
        console.error("Error fetching difficulties", error);
    }
};

export const fetchQuestion = async ({ quizId }) => {
    try {
        const result = await axiosInstance.get(`/quiz/${quizId}/question`);
        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const json = result.data;
        return json;
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'An error occured while fetching the question',
        });
        console.error("Error fetching question:", error);
        return null;
    }
};

export const sendAnswer = async ({ quizId, question_index, option_index }) => {
    try {
        const response = await axiosInstance.post(`/quiz/${quizId}/question`, {
            question_index: question_index,
            option_index: option_index,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = response.data;
        return data;
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'An error occured while sending your answer',
        });
        console.error("Error:", error);
        return null;
    }
};

export async function fetchAndCreateQuiz(
    category,
    nbQuestions,
    difficulty,
    navigation
) {

    const quizData = {};

    if (!nbQuestions || nbQuestions < 1 || nbQuestions > 50) {
        Toast.show({
            type: 'error',
            text1: 'Number of Questions',
            text2: 'You must select a number of questions between 1 and 50',
        });
        return;
    } else {
        quizData.amount = Number(nbQuestions);
    }

    if (!category || category === "") {
        Toast.show({
            type: 'error',
            text1: 'Category',
            text2: 'You must select a category',
        });
        return;
    } else {
        quizData.category = Number(category);
    }

    if (difficulty) {
        quizData.difficulty = String(difficulty).toLowerCase();
    }

    try {
        const createQuiz = await axiosInstance.post("/quiz", quizData);

        if (!createQuiz) {
            throw new Error("No response returned");
        }

        const data = createQuiz.data;

        if (!data) {
            throw new Error("No data returned");
        }

        await createGameId(data.quiz_id, navigation);
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'An error occured while creating the quiz',
        });
        console.error("Error creating quiz:", error);
    };
}

export async function createGameId(quizId, navigation) {
    try {
        const gameResponse = await axiosInstance.get(`/game/${quizId}/create`);
        if (gameResponse && gameResponse.data.game_id) {
            navigation.navigate('Questions', { gameId: gameResponse.data.game_id });
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter a valid code.',
            });
        }
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'An error occured while creating the game',
        });
        console.error("Error creating game:", error);
    }
}