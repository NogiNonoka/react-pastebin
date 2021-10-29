const apiURL = "http://localhost:3030/";

export default {
    baseURL: "http://localhost:3000/",
    api: {
        read: apiURL + "code/read",
        write: apiURL + "code/write",
        check: apiURL + "code/check",
    },
    supportCodeLang: [
        {name: 'C/C++', value: 'C++'},
        {name: 'Java', value: 'Java'},
        {name: 'Python', value: 'Pyhton'},
        {name: 'Html', value: 'Html'},
        {name: 'JavaScript', value: 'JavaScript'},
        {name: 'TypeScript', value: 'TypeScript'},
        {name: 'Text', value: 'text'}
    ],
}