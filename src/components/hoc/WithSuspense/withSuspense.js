import React from 'react'
import { Spin } from 'antd';


const withSuspense = Component => {
    return props => <React.Suspense fallback={<Spin tip='Please wait...'></Spin>}>
        <Component {...props} />
    </React.Suspense>
}

export default withSuspense