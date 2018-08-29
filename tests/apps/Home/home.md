#displaying 2ndary command bars
-- the 'HostAppView' will display a 2nd command bar if given 'commandBarProps' , otherwise it will display nothing

```js
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items }}>
                {this.props.children}
            </HostAppView>
        );
        
        
```

#vs

```js
        return (
            <HostAppView host={this.props.host}>
                {this.props.children}
            </HostAppView>
        );
        
        
```