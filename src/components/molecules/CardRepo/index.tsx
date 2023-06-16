interface RepoData {
  name: string
}

const CardRepo = (data: RepoData) => {
  return (
    <div className="p-3 m-3 shadow rounded">
      <div className="columns-2 font-bold">
        <h1>{data.data.name}</h1>
        <span className="flex items-center justify-end">
          <h1 className="m-2">{data.data.stargazers_count}</h1>
          <i className="pi pi-star-fill"></i>
        </span>
      </div>
      <div className="description">{data.data.description || '-'}</div>
    </div>
  )
}

export default CardRepo
