/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRouter } from "next/router";
import Link from "next/link";

const Note = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div sx={{ variant: "containers.page" }}>
            <h1>Note: {id} </h1>
        </div>
    );
};

export default Note;

export async function getServerSideProps({ params, req, res }) {
    const response = await fetch(
        `${process.env.LOCALHOST}/api/note/${params.id}`
    );

    if (!response.ok) {
        res.writeHead(302, { Location: "/notes" });
        res.end();
        return { props: {} };
    }

    const { data } = await response.json();

    if (data) {
        return {
            props: { note: data },
        };
    }
}
