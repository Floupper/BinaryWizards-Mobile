import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
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