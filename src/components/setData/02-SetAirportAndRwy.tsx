import { Platform, StyleSheet, Text, View } from "react-native"
import CustomInput from "../ui/CustomInput"
import CustomButton from "../ui/CustomButton"
import { Fragment, useState } from "react"
import { m_to_ft } from "../../seeds/units"
import { AirportType, touchdownType } from "../../types/types"
import airports from "../../seeds/airports"
import { Chip, Divider } from "react-native-paper"
import CustomRadio from "../ui/CustomRadio"
import SelectFromMap from "./04-SelectFromMap"

interface propsType {
  checked: string
  touchdown: touchdownType | undefined
  setTouchdown: React.Dispatch<React.SetStateAction<touchdownType | undefined>>
}
export default function SetAirportAndRwy(prop: propsType){
  const { checked, touchdown, setTouchdown } = prop
  const [lat, setLat] = useState("35.54563")
  const [lng, setLng] = useState("139.80094")
  const [elevation, setElevation] = useState("20")
  const [finalApproachCourse, setFinalApproachCourse] = useState("338")
  const [varidation, setVaridation] = useState("-8")
  const [distanceFromThreshold, setDistanceFromThreshold] = useState((400 * m_to_ft).toString())
  const [airport4letters, setAirport4letters] = useState('')
  const [state, setState] = useState<string>('')
  const [checkedRwy, setCheckedRwy] = useState('');
  const [decidedAP, setDecidedAP] = useState(false)
  const [selectedAP, setSelectedAP] = useState<AirportType|undefined>(undefined)

  const airportsNameArray = airports.map(airport => airport.icao)

  return (
    <>
      {/* ４レターの場合　*/}
      {checked === 'icao' && (
        <>
          <Divider style={{marginVertical: 32}} />
          <Text style={styles.title}>
            2. Set Airport Data
          </Text>
          <CustomInput
            label='Input Airport ICAO 4 Letters'
            val={airport4letters}
            setVal={setAirport4letters}
            keyboard={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
            placeholder='RJTT'
            disabled={decidedAP === true ? true: false}
            autofocus={true}
            state={state}
            setState={setState}
          />

          {!decidedAP ? (
            // ４レターがデータに存在している場合はボタンが押せる
            <>
              <Text style={{fontSize: 12, color: 'white', marginBottom: 4}}>
                If airport data exists, a chip appears below.
              </Text>
              <View style={{flexDirection: 'row', gap: 2, flexWrap: 'wrap'}}>
                {airports.map(airport => {
                  return (
                    <Fragment key={airport.icao}>
                      {airport4letters && airport.icao.includes(airport4letters) &&
                        <Chip
                          style={{backgroundColor: 'white'}}
                          onPress={()=>{
                          setAirport4letters(airport.icao)
                          setState(airport.icao)
                        }}>
                          {airport.icao}
                        </Chip>
                      }
                    </Fragment>
                  )
                })}
              </View>
              {
                airport4letters.length === 4 &&
                airportsNameArray.includes(airport4letters) && (
                  <CustomButton
                    label='Next --Select Landing Runway'
                    fun={()=>{
                      setDecidedAP(true)
                      const airportSelected = airports.find(airport => airport.icao === airport4letters);
                      setSelectedAP(airportSelected)
                    }}
                  />
                )
              }
            </>
          ) : (
            // ボタンを押すとボタンが消え、RWY選択肢を表示する。RWY選ぶと次のボタンが出現。
            // さらにそのボタンを押すとtouchdownにデータが入る
            <>
              {!touchdown ? (
                <>
                  <Text style={styles.rwy}>
                    - Select Landing Runway
                  </Text>
                  {selectedAP?.runways.map(runway=>{
                    return (
                      <CustomRadio
                        key={runway.id}
                        checked={checkedRwy}
                        setChecked={setCheckedRwy}
                        label={runway.id}
                        buttonName={runway.id}
                      />
                    )
                  })}

                  {selectedAP && checkedRwy!=='' && (
                    <CustomButton
                      label='Next -your Custom Config'
                      fun={()=>{
                        const rwy = selectedAP.runways.find(runway => runway.id === checkedRwy)
                        if(rwy){
                          setTouchdown({
                            lat: rwy.touchdownLat,
                            lng: rwy.touchdownLng,
                            elevation: rwy.elevation,
                            finalApproachCourse: rwy.heading,
                            varidation: selectedAP.varidation,
                            distanceFromThreshold: rwy.distanceFromThreshold
                          })
                        }
                      }}
                    />
                  )}
                </>
              ) : (
                // ボタンを押すとRWYの選択肢とボタンが消える
                <Text style={{color: 'white'}}>
                   -Landing RWY: <Text style={{color: 'white', fontSize: 24}}>{checkedRwy}</Text>
                </Text>
              )}
            </>

          )}

        </>
      )}

      {/* 2 カスタム入力の場合　*/}
      {checked === 'custom' && (
        <View>
          <Divider style={{marginVertical: 32}} />

          <Text style={styles.title}>
            2. Set Airport Data
          </Text>

          <View style={styles.BoxBorder}>
            <Text style={styles.subtitle}>
              Set Airport Config
            </Text>
            {!touchdown &&
              <SelectFromMap
                setLat={setLat}
                setLng={setLng}
              />
            }
            <CustomInput
              label='Touchdown Point Latitude [deg]'
              val={lat}
              setVal={setLat}
              disabled={touchdown ? true : false}
              customAirport={true}
            />
            <CustomInput
              label='Touchdown Point Longitude [deg]'
              val={lng}
              setVal={setLng}
              disabled={touchdown ? true : false}
              customAirport={true}
            />
            <CustomInput
              label='Touchdown Point Elevation [ft]'
              val={elevation}
              setVal={setElevation}
              disabled={touchdown ? true : false}
              customAirport={true}
            />
            <CustomInput
              label='Final Approach Course (MAG)[deg]'
              val={finalApproachCourse}
              setVal={setFinalApproachCourse}
              disabled={touchdown ? true : false}
              customAirport={true}
            />
            <CustomInput
              label='VAR [deg] (East: +, West: -)'
              val={varidation}
              setVal={setVaridation}
              disabled={touchdown ? true : false}
              customAirport={true}
            />
            <CustomInput
              label='Distance from Threshold to Touchdown [ft]'
              val={distanceFromThreshold}
              setVal={setDistanceFromThreshold}
              disabled={touchdown ? true : false}
              customAirport={true}
            />
          </View>

          {!touchdown && (
            <CustomButton
              label='Next - Your Config'
              fun={()=>{
                setTouchdown({
                  lat: parseFloat(lat),
                  lng: parseFloat(lng),
                  elevation: parseFloat(elevation),
                  finalApproachCourse: parseFloat(finalApproachCourse),
                  varidation: parseFloat(varidation),
                  distanceFromThreshold: parseFloat(distanceFromThreshold)
                }
              )}}
            />
          )}

        </View>
      )}
    </>
  )
}
const styles = StyleSheet.create({
  BoxBorder: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white'
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 16,
    textDecorationLine: 'underline',
    color: 'white'
  },
  rwy: {
    marginTop: 32,
    fontSize: 24,
    color: 'white'
  }
})
