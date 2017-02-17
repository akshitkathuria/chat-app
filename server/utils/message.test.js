var expect = require('expect');
var {generateMessage, generateLocationMessage} = require("./message");


describe('generateMessage', () => {
    it("should generate correct message object"), () => {
        var from = "Jen"
        var text = "Hello"

        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        })
    }
})

describe('generateLoactionMessage', () => {
    it("should generate location url"), ()=> {
        var from = "Admin"
        var latitude = 123
        var longitude = 765
        var url = "https://www.google.com/maps/@123,765"

        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url})
    }
})