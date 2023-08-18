import React, { useState } from 'react';
import { Button, Column } from '../../other/Components/Html';
import s from "./Admin.module.scss"
import { Table } from '../../other/Components/Html';

const CategoryTable = function (p) {
  p._admin.getCategorys()

  return (
    <Column f={1} ai='center' >
      <Button mt={2} h={40} w='90%' onPress={() => p.navigation.navigate("CreateCategory",{id:p.route.params.id})}>ساخت دسته ی اغذیه</Button>
      <Column f={.99} class={s.containTable} >
          <CTable {...p} />
      </Column>
    </Column>
  )
}

export default CategoryTable








function CTable (p) {

  const [categoryTable, setcategoryTable] = useState({})
  const deleteCategory = (id) => p._admin.deleteCategory(id)

  return (
    <Table
      color={['#fff', '#eee', 'black']}
      border={[1, '#ccc']}
      header={['حذف', 'ویرایش', ' نمایش محصولات', 'عنوان']}
      body={['❌', '📝', 'نمایش', 'title']}
      btn1={'#d00'}
      btn1onClick={() => { categoryTable._id && deleteCategory(categoryTable._id) }}
      btn2={'orange'}
      btn2onClick={() => { categoryTable._id && p.navigation.navigate('EditCategory', { title: categoryTable.title, id: categoryTable._id }) }}
      btn3={'#09f'}
      btn3onClick={() => {categoryTable._id && p.navigation.navigate('Sellers', { title: categoryTable.title, id: categoryTable._id }) }}
      object={p.category?.value()}
      setobject={setcategoryTable}
    />
  )
}
