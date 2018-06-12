# Prevent missing propTypes in React components (without injected false positives) (non-injected-prop-types)

This rule ensures that all your React components have propTypes set for all of their used properties.
However, it ignores common injected properties such as those introduced by Redux's `mapDispatchToProps` and
`mapStateToProps`. See [eslint-plugin-react/#553](https://github.com/yannickcr/eslint-plugin-react/issues/553) 
for more details.

## Rule Details

Examples of **incorrect** code for this rule:

```js
const Foo = ({ propMissingType }) => 
    (<span>
        {propMissingType}
    </span>);
```

Examples of **correct** code for this rule:

```js
const Foo = ({providedProp, injectedProp}) =>
    (<span>
        {providedProp} 
        {injectedProp}
    </span>)

const mapStateToProps = state => ({
    injectedProp: state.fooBar
})

Foo.propTypes = {
    providedProp: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(Foo)
```

### Options

Consult the documentation for the original rule here: 
https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
