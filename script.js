let jsonText = [
    {
        form: {
            name: "form1",
            items: [
                {
                    type: "filler",
                    message: "<p style='color: black'>filler test</p>"
                }, {
                    type: "text",
                    name: "simple text",
                    placeholder: "placeholder",
                    required: true,
                    validationRules: {
                        type: "tel",
                        value: "qwerty@mail.ru",
                        label: "text label",
                        class: "test-class",
                        disabled: false
                    }
                }, {
                    type: "select",
                    name: "select text",
                    placeholder: "placeholder",
                    required: true,
                    validationRules: {
                        type: "select",
                        value: "qwerty@mail.ru",
                        label: "select label",
                        class: "test-class",
                        disabled: true
                    },
                    options: [
                        {
                            value: "1",
                            text: "select 1",
                            selected: true
                        }, {
                            value: "2",
                            text: "select 2",
                            selected: true
                        }
                    ]
                }
            ],
            postmessage: "it's ok"
        }
    }, {
        form: {
            name: "form2",
            items: [
                {
                    type: "filler",
                    message: "<p style='color: black'>filler 2</p>"
                }, {
                    type: "button",
                    text: "don't push",
                    class: "test-class"
                }, {
                    type: "checkbox",
                    name: "checkbox text",
                    checked: true,
                    placeholder: "placeholder",
                    required: false,
                    validationRules: {
                        type: "checkbox",
                        label: "checkbox label",
                        class: "test-class",
                        disabled: false
                    }
                }, {
                    type: "radio",
                    name: "radio text",
                    placeholder: "placeholder",
                    required: false,
                    validationRules: {
                        type: "radio",
                        value: "radio value",
                        label: "checkbox label",
                        class: "test-class",
                        disabled: true
                    },
                    items: [
                        {
                            value: "value1",
                            label: "label val1",
                            checked: true
                        }, {
                            value: "value2",
                            label: "label val2",
                            checked: true
                        }
                    ]
                }, {
                    type: "textarea",
                    name: "text",

                    required: true,
                    validationRules: {
                        type: "text",
                        value: "text?",
                        label: "textarea label",
                        class: "test-class",
                        disabled: false
                    }
                }
            ],
        }
    }
];

function formGenerator(jsonArray) {
    let result = ``;
    for (let form of JSON.parse(jsonArray)) {
        result += `<form name="${form.form.name}">`;
        for (let formComponent of form.form.items) {
            switch (formComponent.type) {
                case "filler":
                    result += appendFiller(formComponent);
                    break;
                case "button":
                    result += appendButton(formComponent);
                    break;
                case "select":
                    result += appendSelect(formComponent);
                    break;
                case "radio":
                    result += appendRadio(formComponent);
                    break;
                case "text":
                case "textarea":
                case "checkbox":
                    result += appendTextOrTextAreaOrCheckbox(formComponent);
                    break;
            }
        }
        result += `</form>`
    }
    return result
}

function appendFiller(item) {
    return `${item.message}`
}

function appendButton(item) {
    return `<button class="${item.class}">${item.text}</button>`
}

function appendSelect(item) {
    const disabled = item.validationRules.disabled ? "disabled" : ""
    let result = `<select name="${item.name}" required="${item.required}" id="${item.name}" ${disabled} class="${item.class}">`
    for (let option of item.options) {
        const selected = option.selected ? "selected" : ""
        result += `<option ${selected} value="${option.value}">${option.text}</option>`
    }
    if (item.validationRules.label) {
        result += `<label for="${item.name}">${item.validationRules.label}</label>`
    }
    return result + `</select>`
}

function appendRadio(item) {
    const disabled = item.validationRules.disabled ? "disabled" : ""
    let result = ``
    for (let radioItem of item.items) {
        const checked = radioItem.checked ? "checked" : ""
        result += `<input name="${item.name}" ${checked} type="${item.type}" ${disabled}
        id="${radioItem.label}" value="${radioItem.value}" class="${item.class}">
        <label for="${radioItem.label}">${radioItem.label}</label>`
    }
    return result
}

function appendTextOrTextAreaOrCheckbox(item) {
    let type = `type="${item.type}"`
    const disabled = item.validationRules.disabled ? "disabled" : ""
    const valueOrChecked = item.type === "checkbox" ? `checked="${item.checked}"` : `value="${item.validationRules.value}"`
    switch (item.validationRules.type) {
        case "tel":
        case "email":
            type = `type="${item.validationRules.type}"`
    }

    let result = `
        <input name="${item.name}" ${type} placeholder="${item.placeholder ? item.placeholder : ''}" required="${item.required}"
         ${valueOrChecked}  ${disabled} 
         class="${item.validationRules.class}" id="${item.name}">`

    if (item.validationRules.label) {
        result += `<label for="${item.name}">${item.validationRules.label}</label>`
    }

    return result
}

document.querySelector('body').innerHTML = formGenerator(JSON.stringify(jsonText))