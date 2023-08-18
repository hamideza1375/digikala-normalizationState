import { getSingleProduct, getAdminTicketSeen, createSlider, getCategorys, changeAvailable, changeMainAdmin, createCategory, createProduct, createNotification, deleteAdmin, deleteCategory, deleteProduct, deleteMultiProposal, deleteNotification, editCategory, editProduct, getAllAddress, getAllAdmin, getProposal, listUnAvailable, setAdmin, adminTicketBox, getSocketIoSeen, createSeller, getAllSellers, setSellerAvailable, deleteSeller, getSinleCategory, postedOrder, getAllPaymentSuccessFalseAndTrue, postQueue, setOffer, getDataForChart, getProductsTable, getPostPrice, sendPostPrice, getQuitsForSeller } from "../services/adminService"
import _useEffect from "./_initial"
import _Alert from "../other/utils/alert"
import { useEffect } from "react"
import axios from "axios"
import normalizationState from "../other/utils/normalizationState"


export function adminController(p) {

  const sellerTable = { ...p.sellerTable }
  const category = { ...p.category }
  const childItem = { ...p.childItem }
  const listUnAvailabe = { ...p.listUnAvailabe }
  

  //! Seller
  this.createSeller = async () => {
    const { data } = await createSeller({ brand: p.input2, phone: p.phone })
    sellerTable.push(data.value)
    p.setinput2('')
    p.setphone('')
    // p.$input.id('phoneInput').$({text:' '}); p.$input.id('businessInput').$({text:' '})
  }



  this.getAllSellers = async () => {
    useEffect(() => {
      getAllSellers().then(({ data }) => {
        new normalizationState(data.value, p.setsellerTable)
        p.setnewSearchSellerArray(data.value);
      })
    }, [])
  }



  this.deleteSeller = async (id) => {
    _Alert.alert("برای تایید کلیک کنید","",
      [{ text: "cancel", onPress: () => { } },
      {text: "OK", onPress: async () => {await deleteSeller(id); sellerTable.remove(id)}}])
  }



  this.setSellerAvailable = async (id) => {
    _Alert.alert("برای تایید کلیک کنید","",
      [{ text: "cancel", onPress: () => { } },
      {text: "OK", onPress: async () => {
        const { data } = await setSellerAvailable(id)
        sellerTable.find(id, 'available', data.value)
          }
        }
      ]
    )
  }
  //! Seller



  //! Category
  this.createCategory = async () => {
    const { data } = await createCategory({ title: p.title, imageUrl: p.imageUrl })
    category.push(data.value)
    p.settitle('')
    p.setimageUrl({})
  }



  this.getCategorys = () => {
    useEffect(() => {
      (async () => {
        const { data } = await getCategorys()
        new normalizationState(data.value, p.setcategory)
      })()
    }, [])
  }



  this.getSinleCategory = () => {
    _useEffect(() => {
      (async () => {
        const { data } = await getSinleCategory(p.route.params.id)
        p.settitle(data.value.title)
        p.setimageUrl({ name: data.value.imageUrl })
      })()
      return () => {
        p.settitle('')
        p.setimageUrl({})
      }
    }, [])
  }



  this.editCategory = async () => {
    const { data } = await editCategory(p.route.params.id, { title: p.title, imageUrl: p.imageUrl })
    try {
      category.find(p.route.params.id, 'title', data.value.title)
      category.find(p.route.params.id, 'imageUrl', data.value.imageUrl)
      p.settitle('')
      p.setimageUrl({})
      p.navigation.goBack()
    } catch (error) { console.error(error); }
  }



  this.deleteCategory = async (id) => {
    _Alert.alert("برای تایید کلیک کنید","",
      [{ text: "cancel", onPress: () => { } },
      {text: "OK", onPress: async () => {await deleteCategory(id); category.remove(id)}}])
  }
  //! Category



  //! ChildItem
  this.createProduct = async () => {
    const { data } = await createProduct(p.route.params.id, p.route.params.sellerId, {
      image1: p.image1,
      image2: p.image2,
      image3: p.image3,
      image4: p.image4,
      title: p.title,
      price: Number(p.price),
      info: p.info,
      ram: p.input3,
      cpuCore: p.input4,
      camera: p.input5,
      storage: p.input6,
      warranty: p.input7,
      color: JSON.stringify(p.input8),
      display: p.input9,
      operatingSystem: p.input10,
      battery: p.input11,
      network: p.input12,
    })
    childItem.push(data.value)
    p.settitle('')
    p.setprice('')
    p.setimage1({})
    p.setimage2({})
    p.setimage3({})
    p.setimage4({})
    p.setinfo('')
    p.setinput3('')
    p.setinput4('')
    p.setinput5('')
    p.setinput6('')
    p.setinput7('')
    p.setinput8([])
    p.setinput9('')
    p.setinput10('')
    p.setinput11('')
    p.setinput12('')
  }


  this.getProductsTable = () => {
    useEffect(() => {
      (async () => {
        const { data } = await getProductsTable(p.route.params.id, p.route.params.sellerId)
        new normalizationState(data.value.map(item => ({ ...item, imageUrl: item.imageUrl1 })), p.setchildItem)
        p.setnewSearchArray(data.value.map(item => ({ ...item, imageUrl: item.imageUrl1 })));
      })()
      return () => { p.setnewSearchArray([]); childItem.set([]) }
    }, [p.route.params.id, p.route.params.sellerId])
  }



  this.editProduct = async () => {
    await editProduct(p.route.params.id, {
      image1: p.image1,
      image2: p.image2,
      image3: p.image3,
      image4: p.image4,
      title: p.title,
      price: Number(p.price),
      info: p.info,
      ram: p.input3,
      cpuCore: p.input4,
      camera: p.input5,
      storage: p.input6,
      warranty: p.input7,
      color: JSON.stringify(p.input8),
      display: p.input9,
      operatingSystem: p.input10,
      battery: p.input11,
      network: p.input12,
    })
    childItem.find(p.route.params.id, 'title', p.title) 
    childItem.find(p.route.params.id, 'price', p.price)
    p.settitle('')
    p.setprice('')
    p.setimage1({})
    p.setimage2({})
    p.setimage3({})
    p.setimage4({})
    p.setinfo('')
    p.setinput3('')
    p.setinput4('')
    p.setinput5('')
    p.setinput6('')
    p.setinput7('')
    p.setinput8([])
    p.setinput9('')
    p.setinput10('')
    p.setinput11('')
    p.setinput12('')
    p.navigation.goBack()
  }



  this.deleteProduct = async (id) => {
    _Alert.alert("برای تایید کلیک کنید","",
      [{ text: "cancel", onPress: () => { } },
      {text: "OK", onPress: async () => {await deleteProduct(id);childItem.remove(id)}}])
  }



  this.changeAvailable = async (id) => {
    _Alert.alert("برای تایید کلیک کنید","",
      [{ text: "cancel", onPress: () => { } },
      {text: "OK", onPress: async () => {
        const { data } = await changeAvailable(id)
        childItem.find(id, 'available', data.value)
        listUnAvailabe.remove(id)
          }
        }
      ]
    )
  }


  this.setOffer = async () => {
    const { data } = await setOffer(p.route.params.id, { offerTime: Number(p.offerTime), offerValue: Number(p.offerValue) })
    childItem.find(p.route.params.id, 'offerTime', data.value.offerTime)
    childItem.find(p.route.params.id, 'offerValue', data.value.offerValue)
    p.setofferTime('')
    p.setofferValue('')
    p.navigation.goBack()
  }
  //! ChildItem



  this.listUnAvailable = () => {
    _useEffect(() => {
      (async () => {
        const { data } = await listUnAvailable()
        new normalizationState(data.value, p.setlistUnAvailabe)
      })()
    }, [])
  }


  //!SingleItem
  this.getSingleProduct = () => {
    _useEffect(() => {
      (async () => {
        const { data } = await getSingleProduct(p.route.params.id)
        p.settitle(data.value.title)
        p.setprice(data.value.price)
        p.setimage1({ name: data.value.imageUrl1 })
        p.setimage2({ name: data.value.imageUrl2 })
        p.setimage3({ name: data.value.imageUrl3 })
        p.setimage4({ name: data.value.imageUrl4 })
        p.setinfo(data.value.info)
        p.setinput3(data.value.ram)
        p.setinput4(data.value.cpuCore)
        p.setinput5(data.value.camera)
        p.setinput6(data.value.storage)
        p.setinput7(data.value.warranty)
        p.setinput8(data.value.color)
        p.setinput9(data.value.display)
        p.setinput10(data.value.operatingSystem)
        p.setinput11(data.value.battery)
        p.setinput12(data.value.network)
      })()
      return () => {
        p.settitle('')
        p.setprice('')
        p.setimage1({})
        p.setimage2({})
        p.setimage3({})
        p.setimage4({})
        p.setinfo('')
        p.setinput3('')
        p.setinput4('')
        p.setinput5('')
        p.setinput6('')
        p.setinput7('')
        p.setinput8([])
        p.setinput9('')
        p.setinput10('')
        p.setinput11('')
        p.setinput12('')
      }
    }, [])
  }
  //!SingleItem



  //! Admin
  this.setAdmin = async () => {
    await setAdmin({ phoneOrEmail: p.phoneOrEmail })
    p.setphoneOrEmail('')
  }


  this.deleteAdmin = async () => {
    _Alert.alert("برای تایید کلیک کنید","",
      [{ text: "cancel", onPress: () => { } },
      {text: "OK", onPress: async () => {
          await deleteAdmin(p.phoneOrEmail)
          p.setallAdmin(admin =>
          admin.filter(a => a.phoneOrEmail !== p.phoneOrEmail)
            )
          }
        }
      ]
    )
  }



  this.getAllAdmin = async () => {
    _useEffect(() => {
      (async () => {
        const { data } = await getAllAdmin()
        p.setallAdmin(data.value)
      })()
    }, [])
  }



  this.logout = async () => {
    await AsyncStorage.removeItem("token");
    p.settokenValue({})
    axios.defaults.headers.common["Authorization"] = ''
    p.navigation.replace("Home")
  }



  this.changeMainAdmin = async () => {
    _Alert.alert("برای تایید کلیک کنید","",
      [{ text: "cancel", onPress: () => { } },
      {text: "OK", onPress: async () => {
        await changeMainAdmin({ adminPhone: p.adminPhone, newAdminPhone: p.newAdminPhone })
        p.setadminPhone('')
        p.setnewAdminPhone('')
        this.logout()
          }}
      ])
  }
  //! Admin



  //! Proposal
  this.getProposal = async () => {
    _useEffect(() => {
      getProposal().then(({ data }) => {
      p.setproposal(data.value)
      })
      return () => p.setproposalId([])
    }, [])
  }



  this.deleteMultiProposal = async () => {
    _Alert.alert("برای تایید کلیک کنید","",
      [{ text: "cancel", onPress: () => { } },
      {text: "OK", onPress: async () => {
          await deleteMultiProposal({ proposalId: p.proposalId })
          p.proposalId.map(pId => (
          p.setproposal(proposal => proposal.filter((pr) => pr._id !== pId))
            ))
          }
        }
      ]
    )
  }
  //! Proposal



  //! Notification
  this.createNotification = async () => {
    await createNotification({ title: p.title, message: p.message })
    p.settitle('')
    p.setmessage('')
    p.navigation.goBack()
  }



  this.deleteNotification = async () => {
    _Alert.alert("برای تایید کلیک کنید","",
      [{ text: "cancel", onPress: () => { } },
      {text: "OK", onPress: async () => {await deleteNotification()}}])
  }
  //! Notification



  //! Address Payment
  this.getAllAddress = async () => {
    _useEffect(() => {
      (async () => {
        const { data } = await getAllAddress()
        p.setallAddress(data.value)
        p.setnewSearchAddressArray(data.value)
      })()
    }, [])
  }



  this.postedOrder = async (id) => {
    _Alert.alert("برای تایید کلیک کنید","",
      [{ text: "cancel", onPress: () => { } },
      {text: "OK", onPress: async () => {await postedOrder(id); p.setallAddress(addres => addres.filter(a => a._id !== id))}}])
  }



  this.postQueue = async (id) => {
    _Alert.alert("برای تایید کلیک کنید",
      "",
      [{ text: "cancel", onPress: () => { } },
      {text: "OK", onPress: async () => {
            const { data } = await postQueue(id)
            p.setallAddress(allAddres => {
              try {
                const _allAddres = [...allAddres]
                const index = _allAddres.findIndex(a => a._id === id)
                if (index === -1) throw new Error()
                _allAddres[index].queueSend = data.value
                return _allAddres
              } catch (error) { }
            })
          }
        }
      ]
    )
  }



  this.getAllPaymentSuccessFalseAndTrue = async () => {
    _useEffect(() => {
      (async () => {
        const { data } = await getAllPaymentSuccessFalseAndTrue()
        p.setallPaymentSuccessFalseAndTrue(data.value)
      })()
    }, [])
  }
  //! Address Payment



  //! QuitsForSeller
  this.getQuitsForSeller = async () => {
    useEffect(() => {
      (async () => {
        const { data } = await getQuitsForSeller()
        p.setallQuitsSeller(data.value)
      })()
    }, [])
  }
  //! QuitsForSeller



  //! PostPrice
  this.sendPostPrice = () => {
    sendPostPrice({ price: Number(p.price) }).then(() => {
      p.setprice('')
      p.navigation.goBack()
    })
  }

  this.getPostPrice = () => {
    useEffect(() => { setTimeout(() => { getPostPrice().then(({ data }) => { p.setpostPrice(data.value) }) }, 100); }, [])
  }
  //! PostPrice



  //! TicketBox
  this.adminTicketBox = async () => {
    _useEffect(() => {
      adminTicketBox().then(({ data }) => {
      p.setadminTicketBox(data.value)
      })
    }, [])
  }



  this.getAdminTicketSeen = () => {
    _useEffect(() => {
      (async () => {
        const { data } = await getAdminTicketSeen()
        p.setticketSeen(data.seen)
      })()
    }, [])
  }
  //! TicketBox



  //! DataForChart
  this.getDataForChart = async (type) => {
    useEffect(() => {
      (async () => {
        const { data: { value } } = await getDataForChart(type)
        switch (type) {
          case 'address7DeyForChart':
            p.setaddress7DeyForChart(value)
            break;
          case 'users7DeyForChart': {
            p.setusers7DeyForChart(value.users7DeyForChart)
            p.setusersLength(value.usersLength)
          } break;
          case 'address1YearsForChart':
            p.setaddress1YearsForChart(value)
            break;
        }
      })()
    }, [])
  }
  //! DataForChart



  //!SocketIoSeen
  this.getSocketIoSeen = () => {
    _useEffect(() => {
      (async () => {
        const { data } = await getSocketIoSeen()
        p.setsocketIoSeen(data)
      })()
    }, [])
  }
  //!SocketIoSeen



  //! createSlider
  this.createSlider = async () => {
    await createSlider({
      image1: p.sliderImage1,
      image2: p.sliderImage2,
      image3: p.sliderImage3,
      image4: p.sliderImage4,
      image5: p.sliderImage5,
      image6: p.sliderImage6,
    })
    p.setsliderImage1({})
    p.setsliderImage2({})
    p.setsliderImage3({})
    p.setsliderImage4({})
    p.setsliderImage5({})
    p.setsliderImage6({})
    p.navigation.goBack()
  }
  //! createSlider
}