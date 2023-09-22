import Header from '@/app/components/Header'
import List from '../../components/List'
import React from 'react'

export default function page() {
  return (
    <>
      <Header/>
      <h1 style={{alignSelf:"start",margin:"5% 0 0 5%"}}>More "Trending"</h1>
      <List type="more"/>
    </>
  )
}
