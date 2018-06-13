/**
 * @fileoverview Prevent missing propTypes in React components (without injected false positives)
 * @author Ammar Askar
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/non-injected-prop-types');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const settings = {
  react: {
    pragma: 'Foo'
  }
};

require('babel-eslint');


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run("non-injected-prop-types", rule, {
    valid: [
        {
            code: `
                var Hello = createReactClass({
                    propTypes: {
                        name: PropTypes.string.isRequired
                    },
                    render: function() {
                        return <div>Hello {this.props.name}</div>;
                    }
                });
            `
        },
        {
            code: `
                const Foo = ({providedProp, injectedProp}) =>
                    (<span>
                        {providedProp}
                        {injectedProp}
                    </span>);
                Foo.propTypes = {
                    providedProp: PropTypes.string.isRequired
                };
                const mapStateToProps = (state) => ({
                    injectedProp: "123"
                });
                export default connect(mapStateToProps)(Foo);
            `
        },
        {
            code: `
                const Foo = (props) => {
                    const stuff = props.dispatchX();
                    return (<h1>{stuff} {props.injectedProp}</h1>);
                };
                function mapStateToProps({ foo }) {
                    return {injectedProp: foo}
                }
                export default connect(mapStateToProps, { dispatchX })(Foo);
            `
        },
        {
            code: `
                class Hello extends React.Component {
                    render() {
                        const prod = this.props.fetchProduct('car');
                        return <span>{prod}</span>;
                    }
                }
                const mapDispatchToProps = (dispatch, { lineItemId }) =>
                    bindActionCreators(
                        {
                            fetchProduct: (_) => 'Toyota'
                        },
                        dispatch
                    );
                export default connect(makeMapStateToProps, mapDispatchToProps)(Hello);
            `
        }
    ],

    invalid: [
        {
            code: `
                const Foo = (props) => {
                    return <span>{props.name}</span>
                };
            `,
            options: [{skipUndeclared: false}],
            errors: [{
                message: `'name' is missing in props validation`
            }]
        }
    ]
});
