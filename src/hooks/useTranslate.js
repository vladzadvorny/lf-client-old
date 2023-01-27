import { useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'

export const useTranslate = () => useContext(TranslateContext)
