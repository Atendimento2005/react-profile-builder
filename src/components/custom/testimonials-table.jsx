import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
export default function TestimonialsTable({ uid }) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[5rem]">Sl No.</TableHead>
          <TableHead className="w-[250px]">Name</TableHead>
          <TableHead>Testimonial</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Venu Gopal Iyer</TableCell>
          <TableCell>Excellent service. 10/10 would reccomend</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>Sarah Lopez</TableCell>
          <TableCell>Very impressed! Exactly what I needed.</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>3</TableCell>
          <TableCell>David Williams</TableCell>
          <TableCell>
            Really helpful and informative. A pleasure to deal with.
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>4</TableCell>
          <TableCell>Lisa Moore</TableCell>
          <TableCell>
            Made a big difference! Would definitely recommend.
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>5</TableCell>
          <TableCell>Michael Brown</TableCell>
          <TableCell>Fast and efficient. Got the job done quickly.</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>6</TableCell>
          <TableCell>Emily Garcia</TableCell>
          <TableCell>Exceeds expectations! Top quality service.</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>7</TableCell>
          <TableCell>Daniel Hernandez</TableCell>
          <TableCell>Knowledgeable and professional. 5 stars!</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>8</TableCell>
          <TableCell>Isabella Johnson</TableCell>
          <TableCell>
            Absolutely fantastic! Would use again in a heartbeat.
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>9</TableCell>
          <TableCell>William Jones</TableCell>
          <TableCell>Very happy with the results. Highly recommend.</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>10</TableCell>
          <TableCell>Charlotte Miller</TableCell>
          <TableCell>A lifesaver! Saved me so much time and effort.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
