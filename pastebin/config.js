const apiURL = "http://localhost:4040/";

export default {
    baseURL: "http://localhost:4000/",
    api: {
        read: apiURL + "code/read",
        write: apiURL + "code/write",
        check: apiURL + "code/check",
    },
    supportCodeLangOptions: [
        {name: 'C/C++', value: 'C++'},
        {name: 'Java', value: 'Java'},
        {name: 'Python', value: 'Python'},
        {name: 'Html', value: 'Html'},
        {name: 'JavaScript', value: 'JavaScript'},
        {name: 'TypeScript', value: 'TypeScript'},
        {name: 'Text', value: 'Plain Text'}
    ],
    expirationOptions: [
        {text: '2 hours', value: 2 * 60 * 60},
        {text: '5 hours', value: 5 * 60 * 60},
        {text: '24 hours', value: 24 * 60 * 60},
        {text: '48 hours', value: 48 * 60 * 60}
    ]
}