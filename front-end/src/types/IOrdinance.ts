export interface IOrdinance {
  ID: string
  Title: string
  summary: string
  'Meeting Body': string
  'Action Date': string
  vote: 'Yay' | 'No' | 'Excused'
  affordable_housing_development_score: number
  tenant_protections_score: number
  homelessness_and_supportive_housing_score: number
  faster_permitting_process_and_bureaucracy_score: number
  land_use_and_zoning_reform: number
  acc_affordable_housing_development_score: number
  acc_tenant_protections_score: number
  acc_homelessness_and_supportive_housing_score: number
  acc_faster_permitting_process_and_bureaucracy_score: number
  acc_land_use_and_zoning_reform: number
}
