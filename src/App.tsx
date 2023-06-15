import React, { ReactElement, useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Accordion, AccordionTab } from 'primereact/accordion'
import CardRepo from './components/molecules/CardRepo'
import { getAPI } from './services/API'
import { ProgressSpinner } from 'primereact/progressspinner'

interface UserData {
  name: string
  title: string
  id: string
  login: string
}

function App(): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [valueLabel, setValueLabel] = useState<string>('')
  const [listData, setListData] = useState<UserData[]>([])

  const getData = () => {
    setIsLoading(true)
    getAPI('search/users', `q=${value}`).then((res) => {
      if (res.status == 200) {
        setValueLabel(value)
        setListData(res.data.items)
        setIsLoading(false)
        console.log(res)
      } else {
        setIsLoading(false)
        console.log(res)
      }
    })
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className="p-3 shadow-lg w-full md:w-3/4">
        <div className="mb-3">
          <InputText
            className="w-full mb-3"
            value={value}
            placeholder="Enter username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
        </div>
        <Button
          label="Search"
          severity="info"
          className="w-full"
          onClick={(e) => getData()}
        />
        {!isLoading ? (
          <div className="list-user mt-3">
            {listData?.length && listData.length > 1 ? (
              <>
                <label className="mb-3">Showing users for "{valueLabel}"</label>
                <Accordion className="mt-3">
                  {listData.map((UserData) => (
                    <AccordionTab key={UserData.login} header={UserData.login}>
                      <CardRepo />
                    </AccordionTab>
                  ))}
                </Accordion>
              </>
            ) : (
              'Data Kosong'
            )}
          </div>
        ) : (
          <div className="flex justify-center h-1/2 flex-col">
            <ProgressSpinner />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
