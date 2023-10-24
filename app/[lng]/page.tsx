import { ParamProps } from "../globalType"
import { FirstPageWrapper } from "./c.firstpage"
import { CardsContainer } from "./cssCard"

 
export default async function Home({params}:ParamProps) {
  return (
      <FirstPageWrapper>
        <CardsContainer lng={params.lng} />
      </FirstPageWrapper>
  )
}
