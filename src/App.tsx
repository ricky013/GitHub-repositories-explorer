import React, { ReactElement, useEffect, useState, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Accordion, AccordionTab } from 'primereact/accordion'
import CardRepo from './components/molecules/CardRepo'
import { getAPI } from './services/API'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Messages } from 'primereact/messages'

interface UserData {
  login: string
}
interface RepoData {
  name: string
  stargazers_count: number
  description: string
}

function App(): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingRepo, setIsLoadingRepo] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [valueLabel, setValueLabel] = useState<string>('')
  const [activeIndex, setActiveIndex] = useState<number>('')
  const [listData, setListData] = useState<UserData[]>([])
  const [listRepo, setListRepo] = useState<RepoData[]>([])
  const msgs = useRef(null)
  const msgsRepo = useRef(null)

  const getData = (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    getAPI('search/users?', `q=${value}&per_page=5`).then((res) => {
      if (res.status == 200) {
        setValueLabel(value)
        setListData(res.data.items)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    })
  }

  const getDataRepos = (index: number) => {
    setActiveIndex(0)
    if (index != activeIndex) {
      setActiveIndex(index)
      setIsLoadingRepo(true)
      let name = listData[index]?.login

      getAPI('users/', `${name}/repos`).then((res) => {
        if (res.status == 200) {
          setListRepo(res.data)
          setIsLoadingRepo(false)
        } else {
          setIsLoadingRepo(false)
        }
      })
    }
  }

  useEffect(() => {
    if (listData.length < 1 && value == '') {
      return msgs?.current?.show({
        sticky: true,
        severity: 'info',
        detail: 'Please search for result.',
        closable: false
      })
    }

    if (listData.length < 1 && value != '') {
      return msgs?.current?.show({
        sticky: true,
        severity: 'error',
        detail: 'Result not found',
        closable: false
      })
    }
  }, [listData])

  useEffect(() => {
    if (listRepo?.length < 1 && value != '') {
      return msgsRepo?.current?.show({
        sticky: true,
        severity: 'error',
        detail: 'Repo empty.',
        closable: false
      })
    }
  }, [listRepo])

  return (
    <div className="w-full h-screen flex justify-center bg-blue-100">
      <div className="p-3 shadow-lg w-full h-screen md:w-3/4 glass">
        <form onSubmit={(e) => getData(e)}>
          <div className="mb-3">
            <InputText
              className="w-full mb-3"
              value={value}
              placeholder="Enter username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              required
            />
          </div>
          <Button
            label="Search"
            severity="info"
            className="w-full focus:shadow-none"
            // onClick={(e) => getData()}
            type="submit"
          />
        </form>
        {!isLoading ? (
          <div className="list-user mt-3 p-3 transition-all">
            {listData?.length && listData.length >= 1 ? (
              <>
                <label className="mb-3">Showing users for "{valueLabel}"</label>
                <Accordion
                  className="mt-3 h-[67vh] overflow-auto focus:outline-none p-[inherit] transition-all"
                  activeIndex={activeIndex}
                  onTabChange={(e) => {
                    getDataRepos(e.index)
                  }}
                >
                  {listData.map((UserData) => (
                    <AccordionTab
                      key={UserData.login}
                      header={UserData.login}
                      className="transition-all"
                    >
                      {!isLoadingRepo ? (
                        listRepo?.length && listRepo?.length >= 1 ? (
                          listRepo.map((RepoData) => (
                            <CardRepo
                              name={RepoData.name}
                              stargazers_count={RepoData.stargazers_count}
                              description={RepoData.description}
                            />
                          ))
                        ) : (
                          <Messages ref={msgsRepo} />
                        )
                      ) : (
                        <div className="flex justify-center">
                          <ProgressSpinner
                            style={{
                              width: '50px',
                              height: '50px'
                            }}
                            strokeWidth="8"
                          />
                        </div>
                      )}
                    </AccordionTab>
                  ))}
                </Accordion>
              </>
            ) : (
              <Messages ref={msgs} />
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
