import React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <Layout>
    <h1>Page not found</h1>
    <Link to="/">Return home.</Link>
  </Layout>
)

export default NotFoundPage
