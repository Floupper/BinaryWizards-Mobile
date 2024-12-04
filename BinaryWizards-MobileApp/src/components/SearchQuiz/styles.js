import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
        width: '100%',
    },
    pickerContainer: {
        marginBottom: 12,
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
        width: '100%',
        marginHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    rangeInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    inputGroup: {
        flex: 1,
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: '#555',
    },
    input: {
        width: '100%',
        height: 40,
        paddingHorizontal: 12,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#f8f8f8',
    },
});