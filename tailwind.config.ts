import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                eggshell: "#FEFDFB",
                creme: "#FFF3D6",
                primary: "#9900FF",
                charcoal: "#404040"
            },
            fontFamily: {
                iawriter: ['IaWriter', 'sans-serif'],
                migra: ['migra', 'serif']
            }
        }
    }
}