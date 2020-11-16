import { colors } from 'styles/theme'

export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
        button {
          align-items: center;
          background: ${colors.black};
          border-radius: 9999px;
          border: 0;
          color: ${colors.white};
          cursor: pointer;
          display: flex;
          font-weight: 800;
          padding: 0.5rem 1rem;
          transition: opacity 0.3s ease;
          user-select: none;
        }
        button[disabled] {
          pointer-events: none;
          opacity: 0.2;
        }
        button > :global(svg) {
          margin-right: 8px;
        }
        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
