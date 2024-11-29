import { StyleSheet } from "react-native";

export const styleSearchQuiz = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    picker: {
        height: 50,
        marginBottom: 12,
    },
    searchButton: {
        backgroundColor: '#6200ee',
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 26,
        marginBottom: 16,
    },
    searchButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    loadingIndicator: {
        marginVertical: 16,
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
        fontSize: 16,
    },
    selectListDropdown: {
        width: "100%",
        marginHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "gray",
    },
    flatlist: {
        height: 15
    },
});