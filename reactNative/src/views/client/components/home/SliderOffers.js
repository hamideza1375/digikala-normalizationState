import React, { memo } from 'react'
import _useEffect from '../../../../controllers/_initial'
import { Img, P, Press, Py, ScrollSlider, Column } from '../../../../other/Components/Html'
import LinearGradient from '../../../../other/Components/other/LinearGradient'
import spacePrice from '../../../../other/utils/spacePrice'
import s from '../../client.module.scss'
import CardItem from '../CardItem'
import { localhost } from '../../../../other/utils/axios/axios'


const SliderOffers = (p) => {
  p._client.getOffers()

  return (
    <>
      <Column h={330} >
        <Img class={s.o_img} style={{ position: 'absolute', top: 20, left: 2, zIndex: -1, width: 88, height: 88 }} src={{ uri: `${localhost}/images/glass2.png` }} />
        <Img class={s.o_img} style={{ position: 'absolute', top: 25, left: 50, zIndex: -1, width: 88, height: 88 }} src={{ uri: `${localhost}/images/glass1.png` }} />
        <Img class={s.o_img} style={{ position: 'absolute', top: 235, right: 55, zIndex: -1, width: 88, height: 88 }} src={{ uri: `${localhost}/images/glass1.png` }} />
        <Img class={s.o_img} style={{ position: 'absolute', top: 231, zIndex: -1, width: 88, height: 88 }} src={{ uri: `${localhost}/images/glass2.png` }} />
        <Img class={s.o_img} style={{ position: 'absolute', top: 240, left: 15, zIndex: -1, width: 88, height: 88 }} src={{ uri: `${localhost}/images/glass12.png` }} />
        <Column f={1} >
          <Column class={s.o_offerGlass2} t={0}></Column>
          <Column class={s.o_offerGlass} t={0}></Column>
          <Column fd='row' ai='center' mt={7} >
            <P mr={15} fs={15} color='#444' > %تخفیف ها</P>
            <LinearGradient nativeStart={{ x: 1.5, y: 1.5 }} webStart={{ x: 7 }} colors={['#f5f', '#505']} style={{ width: '50%', height: 1, flexGrow: 1, marginHorizontal: 25 }} ></LinearGradient>
          </Column>
            <ScrollSlider
              cacheId='sliderOffers1'
              style={{ height: 300, minHeight: 300 }}
              ccStyle={{ height: 300, minHeight: 300, justifyContent: 'center' }}
              data={p.offers}
              renderItem={({ item, index }) => (
                <Column /* mh='auto' */ mh={6} minw={155} fg={1} h={260} col2={{ marginHorizontal: 3 }}>
                  <CardItem item={item} spacePrice={spacePrice} offers w={170} onClick={() => { p.navigation.navigate('SingleProduct', { id: item._id, title:item.title }) }} />
                </Column>
              )}
            /> 
        </Column>
        <Press fd='row' onClick={() => p.navigation.navigate('ProductsOffers')} pos='absolute' b={10} l={10} z={2}><Py color='#fff' >نمایش بیشتر </Py><P mt={1} mr={2} color='#fff' >↩</P></Press>
      </Column>
    </>
  )
}

export default memo(SliderOffers)