interface RepoData {
  name: string
  stargazers_count: number
  description: string
}

const CardRepo = ({ name, stargazers_count, description }: RepoData) => {
  return (
    <div className="p-3 m-3 shadow rounded">
      <div className="columns-2 font-bold">
        <h1>{name}</h1>
        <span className="flex items-center justify-end">
          <h1 className="m-2">{stargazers_count}</h1>
          <i className="pi pi-star-fill"></i>
        </span>
      </div>
      <div className="description">{description || '-'}</div>
    </div>
  )
}

export default CardRepo
