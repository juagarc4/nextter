import { colors } from 'styles/theme'

export default function Button({ children, onClick }) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          background: ${colors.black};
          border: 0;
          color: ${colors.white};
          cursor: pointer;
          border-radius: 9999px;
          font-weight: 800;
          padding: 0.5rem 1rem;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
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
