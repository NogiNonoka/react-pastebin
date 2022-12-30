var apiURL = "http://localhost:4040/";
var baseURL = "http://localhost:4000/";

if (process.env.RUNTIME === "production") {
    var apiURL = "http://1.15.5.104:4040/";
    var baseURL = "http://1.15.5.104:4000/";
}

export default {
    baseURL: baseURL,
    api: {
        read: apiURL + "code/read",
        write: apiURL + "code/write",
        check: apiURL + "code/check",
    },
    supportCodeLangOptions: [
        {name: 'C++', value: 'cpp'},
        {name: 'Java', value: 'java'},
        {name: 'Python', value: 'python'},
        {name: 'JavaScript', value: 'javascript'},
        {name: 'TypeScript', value: 'typescript'},
        {name: 'MarkDown', value: 'markdown'},
        {name: 'JSON', value: 'json'},
        {name: 'Text', value: 'Plain Text'}
    ],
    expirationOptions: [
        {text: '2 hours', value: 2 * 60 * 60},
        {text: '5 hours', value: 5 * 60 * 60},
        {text: '24 hours', value: 24 * 60 * 60},
        {text: '48 hours', value: 48 * 60 * 60}
    ]
}