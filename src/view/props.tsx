import {VIEWSkeys} from './index'
import {SettingsProps} from '../game/settings'

export type ViewProps = {
  setRoute: (r: VIEWSkeys)=>void,
  settings: SettingsProps,
}

