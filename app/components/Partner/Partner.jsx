import React from 'react'
import styled from '@emotion/styled'
import { camelCase } from 'camel-case'

import abus from './svgs/abus-logo.svg'
import bosch from './svgs/bosch-logo.svg'
import brooksEngland from './svgs/brooks-logo.svg'
import buschUndMueller from './svgs/busch-und-mueller-logo.svg'
import ergotec from './svgs/ergotec-logo.svg'
import magura from './svgs/magura-logo.svg'
import rieseUndMueller from './svgs/riese-und-mueller-logo.svg'
import schwalbe from './svgs/schwalbe-logo.svg'
import shimano from './svgs/shimano-logo.svg'
import veloDeVille from './svgs/velo-de-ville-logo.svg'

import viewportsJs from '../../js/viewports.json'

const Partner = () => {
  const partners = [
    veloDeVille,
    schwalbe,
    buschUndMueller,
    abus,
    bosch,
    rieseUndMueller,
    brooksEngland,
    ergotec,
    shimano,
    magura,
  ]

  const links = {
    veloDeVille: 'https://www.velo-de-ville.com/',
  }

  const Grid = styled.section`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr;

    @media ${viewportsJs.sm} {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media ${viewportsJs.md} {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  `

  const Link = styled.a`
    display: block;
  `

  const SvgWrapper = styled.div`
    display: flex;
    align-items: center;

    & svg {
      width: 100%;
      height: 100%;
    }
  `

  return (
    <Grid>
      {partners.map(PartnerSvg => {
        const svgName = camelCase(
          PartnerSvg.name.substring(3, PartnerSvg.name.length - 4),
        )
        const hasLink = Object.keys(links).includes(svgName)
        return (
          <SvgWrapper key={PartnerSvg.name}>
            {hasLink ? (
              <Link
                href={links[svgName]}
                target={svgName}
                rel="noopener noreferrer"
              >
                <PartnerSvg />
              </Link>
            ) : (
              <PartnerSvg />
            )}
          </SvgWrapper>
        )
      })}
    </Grid>
  )
}

export default Partner
