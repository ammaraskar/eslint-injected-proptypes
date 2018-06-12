/**
 * @fileoverview Prevent missing propTypes in React components (without injected false positives)
 * @author Ammar Askar
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/non-injected-prop-types"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("non-injected-prop-types", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "const Foo = ({propMissingType}) => (<span>{propMissingType}</span>);",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
