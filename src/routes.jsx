import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default (
    <Switch>
        <Route exact path="/" render={_=><div>i am main route</div>}/>
    </Switch>
)

