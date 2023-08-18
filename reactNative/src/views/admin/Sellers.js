import React, { useState } from 'react'
import { Button, Column, Table } from '../../other/Components/Html'

const Sellers = (p) => {

  const [_sellerTable, _setsellerTable] = useState({})
  p._admin.getAllSellers()
  const deleteSeller = (id) => p._admin.deleteSeller(id)
  const setSellerAvailable = (id) => p._admin.setSellerAvailable(id)

  return (
    <Column f={1} >
      <Button onClick={() => p.navigation.navigate('AddSeller')} >اضاف کردن فروشنده</Button>
      <Column f={1} w='95%' ai='center' as='center' >
        <Table
          pageLimit={15}
          color={['#fff', '#eee', 'black']}
          border={[1, '#ccc']}
          header={['حدف', 'موجودیت', ' نمایش محصولات', 'تلفن', 'نام تجاری']}
          body={['❌', 'فعال', 'نمایش', 'phone', 'brand']}
          btn1={'#f55'}
          btn1onClick={() => { _sellerTable._id && deleteSeller(_sellerTable._id) }}
          btn2={'#1e1'}
          btn2onClick={() => { _sellerTable._id && setSellerAvailable(_sellerTable._id) }}
          btn3={'#09f'}
          btn3onClick={() => { _sellerTable._id && p.navigation.navigate('ProductsTable', { title: _sellerTable.title, id: p.route.params.id, sellerId: _sellerTable._id }) }}
          btn2Opacity
          object={p.sellerTable?.value()}
          setobject={_setsellerTable}
        />
      </Column>
    </Column>
  )
}


export default Sellers