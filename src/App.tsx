import React, { ReactElement, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Accordion, AccordionTab } from 'primereact/accordion'
import CardRepo from './components/molecules/CardRepo'

function App(): ReactElement {
  const [value, setValue] = useState<string>('')

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
        <Button label="Search" severity="info" className="w-full" />
        <div className="list-user mt-3">
          <Accordion>
            <AccordionTab header="Header I">
              <CardRepo />
            </AccordionTab>
            <AccordionTab header="Header II">
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionTab>
            <AccordionTab header="Header III">
              <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default App
