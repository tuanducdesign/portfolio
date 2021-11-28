import { readdirSync } from 'fs'
import { Project } from '../types/model'
import { dataDir, getMarkdown } from './getMarkdown'

export const getAllProjectFiles = () => {
  return readdirSync(dataDir + '/projects')
}

export const getAllProjects = async () => {
  const projectFiles = getAllProjectFiles()
  const results = await Promise.all(projectFiles.map((p) => getMarkdown(p.slice(0, -3), true)))
  return results as Project[]
}
