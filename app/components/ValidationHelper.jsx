//patterns
export var number = new RegExp(/^[-+]?\d*(?:[\.\,]\d+)?$/);
export var email = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/);

export var numberOremail = new RegExp(number.source + "|" + email.source);

export var password = new RegExp(/^(?=.*\d).{4,8}$/);
